import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:google_fonts/google_fonts.dart';

class PasswordField extends StatefulWidget {
  final String name;
  final String labelText;
  final String? Function(String?)? validator;

  const PasswordField({
    super.key,
    required this.name,
    required this.labelText,
    this.validator,
  });

  @override
  State<PasswordField> createState() => _PasswordFieldState();
}

class _PasswordFieldState extends State<PasswordField> {
  bool _obscureText = true;

  void _togglePasswordVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return FormBuilderTextField(
      name: widget.name,
      obscureText: _obscureText,
      decoration: InputDecoration(
        labelText: widget.labelText,
        labelStyle: GoogleFonts.poppins(),
        prefixIcon: Icon(Icons.lock, color: colorScheme.primary),
        suffixIcon: IconButton(
          icon: Icon(
            _obscureText ? Icons.visibility : Icons.visibility_off,
            color: colorScheme.primary.withAlpha(150),
          ),
          onPressed: _togglePasswordVisibility,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      validator: widget.validator ?? FormBuilderValidators.compose([
        FormBuilderValidators.required(),
        FormBuilderValidators.minLength(6),
      ]),
    );
  }
}