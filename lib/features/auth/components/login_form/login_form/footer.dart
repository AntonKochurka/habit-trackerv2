import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:habit_trackerv2/core/navigation/cubit/navigation_cubit.dart';

class LogInFooter extends StatelessWidget {
  const LogInFooter({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Don't have an account? ",
          style: GoogleFonts.poppins(color: colorScheme.onSurface.withAlpha(150)),
        ),
        GestureDetector(
          onTap: () {
            context.read<NavigationCubit>().navigateSignUp();
          },
          child: Text(
            'Sign Up',
            style: GoogleFonts.poppins(color: colorScheme.primary, fontWeight: FontWeight.w600),
          ),
        ),
      ],
    );
  }
}
