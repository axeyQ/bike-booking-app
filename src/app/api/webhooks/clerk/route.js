import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }
  
  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  
  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  
  let evt;
  
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
  
  // Get the event type
  const { type } = evt;
  
  // Handle user creation
  if (type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    
    const primaryEmail = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ');
    
    // Determine if the user is an admin (you can customize this logic)
    const isAdmin = primaryEmail === process.env.ADMIN_EMAIL; // Set this in your .env
    
    try {
      // Create user in Convex
      await convex.mutation('users:createUser', {
        clerkId: id,
        email: primaryEmail,
        name: name || 'User',
        role: isAdmin ? 'admin' : 'customer',
      });
      
      console.log('User created in Convex:', id);
    } catch (error) {
      console.error('Error creating user in Convex:', error);
    }
  }
  
  // Return a response
  return new Response('Webhook received', { status: 200 });
}