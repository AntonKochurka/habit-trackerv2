import SignUpForm from "../components/signup_form";

export default function SignInPage() {
  const facts = [
    "It takes 66 days on average to form a new habit",
    "People who track habits are 3x more likely to achieve goals",
    "Consistency beats intensity in habit formation",
    "Small daily improvements lead to remarkable results",
    "Writing down goals increases success rate by 42%"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Start your journey to{" "}
              <span className="text-indigo-500">better habits</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands who transformed their lives one habit at a time
            </p>
          </div>
          <SignUpForm />
        </div>

        <div className="space-y-6">
          <div className="text-4xl mb-8">✨</div>
          <div className="space-y-4">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}