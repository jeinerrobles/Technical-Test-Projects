<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols()],
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }


        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
          //  'token' => $token,
            'user' => $user
        ], 201);
    }


    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'exists:users,email'],
            'password' => ['required', 'string','min:8'],
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);


    }

    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in'=>\auth()->factory()->getTTL()*60,
            'user' => auth()->user()
        ]);
    }


    public function profile(){
        return response()->json(auth()->user());
    }

    public function logout(){
        auth()->logout();
        return response()->json([
            'message' => 'User logged out successfully',
        ]);
    }

}
