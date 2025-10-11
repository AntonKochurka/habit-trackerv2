import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:habit_trackerv2/core/theme.dart';
import 'package:habit_trackerv2/features/auth/screens/login_screen.dart';
import 'package:habit_trackerv2/features/auth/screens/signup_screen.dart';
import 'core/navigation/cubit/navigation_cubit.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => NavigationCubit(),
      child: MaterialApp(
        theme: lightTheme,
        darkTheme: darkTheme,
        themeMode: ThemeMode.dark,
        home: BlocBuilder<NavigationCubit, NavigationState>(
          builder: (context, state) {
            if (state is NavigationSplashPage) {
              return const Placeholder();
            } else if (state is NavigationLogInPage) {
              return LogInScreen();
            } else if (state is NavigationSignUpPage) {
              return SignUpScreen();
            } else if (state is NavigationCalendarPage) {
              return const Placeholder();
            }
            return const SizedBox.shrink();
          },
        ),
      ),
    );
  }
}
