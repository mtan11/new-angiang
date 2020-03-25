<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function makeRoleAndAssign(){
        $adminRole = Role::create([
            'name' => "admin" 
        ]);
        $modRole = Role::create([
            'name' => "mod"
        ]);

        $userAdmin = User::whereIn('id',[2,3,4,5])->get();
        foreach ($userAdmin as $user) {
            $user->assignRole($adminRole);
        }

        $userMod = User::whereIn('id',[1,6])->get();
        foreach ($userMod as $user) {
            $user->assignRole($modRole);
        }
    }
}
