import SignInForm from "../components/signin_form";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Sign in to continue your habit journey
              </p>
            </div>
            <SignInForm />
          </div>
        </div>

        <div className="lg:col-span-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl m-4 lg:m-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="text-center text-white space-y-6 max-w-md">
              <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mx-auto flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <h2 className="text-4xl font-bold">
                Track Your Progress
              </h2>
              <p className="text-lg text-indigo-100 leading-relaxed">
                Join millions building better habits every day. See your growth, stay motivated, and achieve your goals.
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="text-yellow-300 text-xl">⭐</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}