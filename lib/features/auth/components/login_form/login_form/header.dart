import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

class LogInHeader extends StatelessWidget {
  const LogInHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Column(
      children: [
        Icon(FontAwesomeIcons.circleUser, size: 80, color: colorScheme.primary),
        const SizedBox(height: 32),
        Text(
          'Welcome Back',
          style: GoogleFonts.poppins(
            fontSize: 28,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Log in to continue',
          style: GoogleFonts.poppins(
            fontSize: 16,
            color: colorScheme.onSurface.withAlpha(150),
          ),
        ),
      ],
    );
  }
}