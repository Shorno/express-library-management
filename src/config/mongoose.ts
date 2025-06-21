import mongoose from 'mongoose';
import "../env"

export async function connectDB(): Promise<void> {
    const uri = process.env.DATABASE_URL!;

    mongoose.connection
        .on('connected', () => console.log('[mongo] ✅ connected'))
        .on('error', err => console.error('[mongo] ❌ connection error:', err))
        .on('disconnected', () => console.log('[mongo] ⚠️ disconnected'));

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('[mongo] initial connect() succeeded');
    } catch (error) {
        console.error('[mongo] initial connect() failed:', error);
        process.exit(1);
    }
}
