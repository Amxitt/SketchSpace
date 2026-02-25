'use client';

import Link from 'next/link';
import { Pencil, Users, Zap, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@repo/ui/button';

export default function Home() {
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Pencil className="h-8 w-8 text-slate-900" />
              <span className="text-2xl font-bold text-slate-900">SketchSpace</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signup">
                <Button className='border px-6 py-2 rounded-md border-gray-400 shadow shadow-gray-400'>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Draw Together,
              <br />
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Create Anywhere
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              A collaborative whiteboard where teams can sketch, brainstorm, and bring ideas to life in real-time.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 text-white bg-black hover:bg-gray-800 rounded-md">
                  Start Drawing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" variant="outline" className="text-lg py-2.5 px-8 border border-gray-400 shadow shadow-graw-400 rounded-md">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Real-time Collaboration
              </h3>
              <p className="text-slate-600">
                Create or join rooms and draw together with multiple users on the same canvas simultaneously.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Instant Setup
              </h3>
              <p className="text-slate-600">
                No downloads required. Jump into a drawing session in seconds with just a room code.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-slate-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-slate-600">
                Your drawings are private by default. Share only with the people you want.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to start creating?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join SketchSpace today and experience the future of collaborative drawing.
            </p>
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 border text-white bg-black rounded-md ">
                Create Your Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Pencil className="h-6 w-6 text-slate-900" />
              <span className="text-lg font-semibold text-slate-900">SketchSpace</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 SketchSpace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
