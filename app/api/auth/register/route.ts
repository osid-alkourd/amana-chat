import { NextRequest, NextResponse } from 'next/server';
import { addUser, userExists, generateUserId } from '@/app/lib/db';
import { User } from '@/app/types/user';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, avatar } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate username length
    if (username.trim().length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (userExists(username, email)) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser: User = {
      id: generateUserId(),
      username: username.trim(),
      email: email.trim(),
      password: password, // Note: In production, hash this password!
      avatar: avatar || '',
      createdAt: new Date(),
      lastSeen: new Date(),
      isOnline: true
    };

    // Save user to database
    const savedUser = addUser(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = savedUser;

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
