import 'package:flutter/material.dart';
import 'package:habit_trackerv2/features/auth/components/signup_form/footer.dart';
import 'package:habit_trackerv2/features/auth/components/signup_form/form.dart';
import 'package:habit_trackerv2/features/auth/components/signup_form/header.dart';

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({super.key});

  @override
  Widget build(BuildContext context) {
      return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              const SizedBox(height: 40),
              const SignUpHeader(),
              const SizedBox(height: 40),
              const SignUpForm(),
              const SizedBox(height: 32),
              const SignUpFooter(),
            ],
          ),
        ),
      ),
    );
  }
}