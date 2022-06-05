<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'mobile' => 'required|digits:10',
            'role' => 'required|digits:1|not_in:0',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()) {
            $response = ['message' => 'Error', 'reason' => $validator->errors()->all()];
            return response()->json($response);
        }

        $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'role_id'=> $request->role,
                'password' => Hash::make($request->password)
            ]);

        return response()->json([
            'message' => 'Success',
            'reason' => 'User registered successfully'
        ], 201);
    }

    public function getUserData() {
        $user = User::get();

        return response()->json([
            'users' => $user
        ]);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            $response = ['message' => 'Error', 'reason' => $validator->errors()->all()];
            return response()->json($response);
        }

        //Request is validated
        //Crean token
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                	'type' => 'Error',
                	'reason' => 'Login credentials are invalid.',
                ]);
            }
        } catch (JWTException $e) {

            return response()->json([
                	'type' => 'Error',
                	'reason' => 'Could not create token.',
                ], 500);
        }
 	
 		//Token created, return with success response and jwt token
        return response()->json([
            'type' => 'Success',
            'token' => $token,
        ]);
    }
    
    private function invalidateToken($token)
    {
        JWTAuth ::setToken($token);
        JWTAuth::invalidate();
    }

    /**
     * Logout user and invalidate token.
     * @return JsonResponse
     */
    public function logout()
    {
        $token = JWTAuth::getToken();
        
        $this->invalidateToken($token);
        auth()->logout();

        return response()->json(['success' => true]);
    }
    
}
