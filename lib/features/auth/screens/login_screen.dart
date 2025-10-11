import 'package:flutter/material.dart';
import 'package:habit_trackerv2/features/auth/components/login_form/login_form/footer.dart';
import 'package:habit_trackerv2/features/auth/components/login_form/login_form/form.dart';
import 'package:habit_trackerv2/features/auth/components/login_form/login_form/header.dart';

class LogInScreen extends StatelessWidget {
  const LogInScreen({super.key});

  @override
  Widget build(BuildContext context) {
      return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              const SizedBox(height: 40),
              const LogInHeader(),
              const SizedBox(height: 40),
              const LogInForm(),
              const SizedBox(height: 32),
              const LogInFooter(),
            ],
          ),
        ),
      ),
    );
  }
}