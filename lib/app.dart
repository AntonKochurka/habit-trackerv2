import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/navigation/cubit/navigation_cubit.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => NavigationCubit(),
      child: MaterialApp(
        home: BlocBuilder<NavigationCubit, NavigationState>(
          builder: (context, state) {
            if (state is NavigationAuthPage) {
              return const Placeholder();
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
