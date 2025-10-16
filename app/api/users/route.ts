import { NextResponse } from 'next/server';
import { getAllUsers } from '@/app/lib/db';

export async function GET() {
  try {
    const users = getAllUsers();
    
    // Return users without passwords
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return NextResponse.json(
      { users: usersWithoutPasswords },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
