import Header from "@/components/header";
import Footer from "@/components/footer";
import Counter from "@/components/counter";
import TodoList from "@/components/todo-list";
import ApiData from "@/components/api-data";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Rocket, Book, Zap, Box, Settings, Smartphone, Code, Route } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="bg-gradient-primary py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Fast with <span className="text-primary">React</span> + <span className="text-orange-custom">Vite</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience lightning-fast development with hot module replacement, optimized builds, and modern JavaScript support. Create production-ready React applications in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3">
                <Rocket className="mr-2 h-5 w-5" />
                Create New Project
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Book className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>
            
            {/* Code Terminal Preview */}
            <div className="bg-gray-900 rounded-xl p-6 text-left max-w-2xl mx-auto shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="text-sm text-gray-300 font-mono">
                <div className="text-green-400">$ npm create vite@latest my-react-app -- --template react</div>
                <div className="text-gray-500">✓ Project created successfully!</div>
                <div className="text-green-400">$ cd my-react-app && npm install</div>
                <div className="text-green-400">$ npm run dev</div>
                <div className="text-gray-500">🚀 Development server started at http://localhost:5173</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose React + Vite?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern development tools that prioritize speed, efficiency, and developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast HMR</h3>
              <p className="text-gray-600">
                Hot Module Replacement updates your app instantly without losing state. See changes in milliseconds, not seconds.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-react/10 rounded-lg flex items-center justify-center mb-6">
                <Box className="text-react text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Component Architecture</h3>
              <p className="text-gray-600">
                Build reusable, composable components with React's powerful component system and modern hooks.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-6">
                <Settings className="text-success text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimized Builds</h3>
              <p className="text-gray-600">
                Rollup-powered builds with tree-shaking, code splitting, and optimizations for production performance.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-orange-custom/10 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="text-orange-custom text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile First</h3>
              <p className="text-gray-600">
                Responsive design patterns and mobile-optimized components that work seamlessly across all devices.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                <Code className="text-purple-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern JavaScript</h3>
              <p className="text-gray-600">
                ES6+ support, TypeScript ready, and modern JavaScript features out of the box with zero configuration.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <Route className="text-blue-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client-side Routing</h3>
              <p className="text-gray-600">
                Built-in routing setup with React Router for seamless navigation and single-page app experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section id="components" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sample Components
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore pre-built components demonstrating React patterns and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Counter />
            <TodoList />
            <ApiData />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section id="docs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get up and running with React + Vite in minutes
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Create Your Project</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-sm text-gray-300 font-mono overflow-x-auto">
                <div className="text-green-400"># Create a new React + Vite project</div>
                <div className="text-white">npm create vite@latest my-react-app -- --template react</div>
                <div className="text-white">cd my-react-app</div>
                <div className="text-white">npm install</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Start Development Server</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-sm text-gray-300 font-mono overflow-x-auto">
                <div className="text-green-400"># Start the development server</div>
                <div className="text-white">npm run dev</div>
                <div className="text-gray-500 mt-2">  ➜  Local:   http://localhost:5173/</div>
                <div className="text-gray-500">  ➜  Network: use --host to expose</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Create Components</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-sm text-gray-300 font-mono overflow-x-auto">
                <div className="text-green-400">// src/components/Counter.jsx</div>
                <div><span className="text-blue-400">import</span> <span className="text-white">{'{ useState }'}</span> <span className="text-blue-400">from</span> <span className="text-yellow-400">'react'</span></div>
                <div className="mt-2"></div>
                <div><span className="text-blue-400">export default function</span> <span className="text-yellow-400">Counter</span><span className="text-white">() {'{'}</span></div>
                <div className="text-white ml-4"><span className="text-blue-400">const</span> [count, setCount] = <span className="text-yellow-400">useState</span>(0)</div>
                <div className="mt-2"></div>
                <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-white">(</span></div>
                <div className="text-white ml-8">&lt;<span className="text-red-400">div</span>&gt;</div>
                <div className="text-white ml-12">&lt;<span className="text-red-400">h2</span>&gt;Count: {'{count}'}&lt;/<span className="text-red-400">h2</span>&gt;</div>
                <div className="text-white ml-12">&lt;<span className="text-red-400">button</span> <span className="text-green-400">onClick</span>={"{() => setCount(count + 1)}"}&gt;</div>
                <div className="text-white ml-16">Increment</div>
                <div className="text-white ml-12">&lt;/<span className="text-red-400">button</span>&gt;</div>
                <div className="text-white ml-8">&lt;/<span className="text-red-400">div</span>&gt;</div>
                <div className="text-white ml-4">)</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Build for Production</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-sm text-gray-300 font-mono overflow-x-auto">
                <div className="text-green-400"># Build optimized production bundle</div>
                <div className="text-white">npm run build</div>
                <div className="text-gray-500 mt-2">✓ Built in 1.23s</div>
                <div className="text-gray-500">  dist/index.html                 0.46 kB</div>
                <div className="text-gray-500">  dist/assets/index-a1b2c3d4.js  143.21 kB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
