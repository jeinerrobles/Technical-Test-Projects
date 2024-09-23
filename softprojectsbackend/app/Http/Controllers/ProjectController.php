<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{

    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }


    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'value' => 'required|numeric',
            'status' => 'required|string|max:255',
            'zone' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }


        $project = Project::create($request->all());


        return response()->json($project, 201);
    }


    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project);
    }


    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'value' => 'numeric',
            'status' => 'string|max:255',
            'zone' => 'string|max:255',
            'type' => 'string|max:255',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $project->update($request->all());

        return response()->json($project);
    }


    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function projectsByStatus()
    {
        $projectsByStatus = Project::select('status', Project::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        return response()->json($projectsByStatus);
    }

    public function totalBudget()
    {
        $totalBudget = Project::sum('value');

        return response()->json(['total_budget' => $totalBudget]);
    }

    public function projectsByZone()
    {
        $projectsByZone = Project::select('zone', Project::raw('count(*) as total'))
            ->groupBy('zone')
            ->get();

        return response()->json($projectsByZone);
    }
}
