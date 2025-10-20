import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:habit_trackerv2/app.dart';
import 'package:habit_trackerv2/core/api/api_client.dart';
import 'package:habit_trackerv2/core/di.dart';
import 'package:habit_trackerv2/core/navigation/cubit/navigation_cubit.dart';
import 'package:habit_trackerv2/features/auth/bloc/auth_bloc.dart';

Future<void> main() async {
  final envFile = File('.env');
  if (await envFile.exists()) {
    await dotenv.load(fileName: envFile.absolute.path, mergeWith: {});
  }

  setupDI();

  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => NavigationCubit()),
        BlocProvider(create: (_) => AuthBloc(getIt<ApiClient>())),
      ],
      child: const App(),
    ),
  );
}
