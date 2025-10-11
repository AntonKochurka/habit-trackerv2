import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:habit_trackerv2/app.dart';
import 'package:habit_trackerv2/core/di.dart';

void main() async {
  await dotenv.load();
  setupDI();
  runApp(const App());
}