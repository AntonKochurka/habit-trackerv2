export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Build better habits with{" "}
              <span className="text-indigo-500">HabitTrack</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              The simplest way to form lasting habits. Track your progress, stay motivated, 
              and transform your life one day at a time.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all shadow-lg">
              Get Started Free
            </button>
            <button className="px-8 py-4 border border-gray-300 dark:border-gray-600 font-semibold rounded-lg hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">Daily Habits</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
                </div>
                
                <div className="space-y-3">
                  {['Morning Meditation', 'Exercise', 'Read 10 pages', 'Drink Water'].map((habit, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{habit}</span>
                      <div className="w-6 h-6 border-2 border-indigo-500 rounded-full flex items-center justify-center bg-white dark:bg-gray-800">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-center text-sm font-medium text-green-600 dark:text-green-400">
                    🎉 4 of 4 habits completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}