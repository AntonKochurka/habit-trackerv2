import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:habit_trackerv2/features/auth/bloc/auth_bloc.dart';
import 'package:habit_trackerv2/features/auth/components/password_field.dart';

class SignUpForm extends StatelessWidget {
  const SignUpForm({super.key});

  @override
  Widget build(BuildContext context) {
    final formKey = GlobalKey<FormBuilderState>();
    final colorScheme = Theme.of(context).colorScheme;

    return FormBuilder(
      key: formKey,
      child: Column(
        children: [
          FormBuilderTextField(
            name: 'email',
            decoration: InputDecoration(
              labelText: 'Email',
              labelStyle: GoogleFonts.poppins(),
              prefixIcon: Icon(Icons.email, color: colorScheme.primary),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            ),
            validator: FormBuilderValidators.compose([
              FormBuilderValidators.required(),
              FormBuilderValidators.email(),
            ]),
          ),
          const SizedBox(height: 20),
          PasswordField(
            name: 'password',
            labelText: 'Password',
          ),
          const SizedBox(height: 20,),
          PasswordField(
            name: 'confirm_password',
            labelText: 'Confirm Password',
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            height: 50,
            child: BlocConsumer<AuthBloc, AuthState>(
              listener: (context, state) {
                if (state is AuthFailure) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(state.errorMessage),
                    ),
                  );
                }
              },
              builder: (context, state) {
                return ElevatedButton(
                  onPressed: state is AuthLoading
                      ? null
                      : () {
                          if (formKey.currentState?.saveAndValidate() ?? false) {
                            final data = formKey.currentState!.value;

                            if (data['password'] != data['confirm_password']) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text('Passwords do not match')),
                              );
                              return;
                            }

                            context.read<AuthBloc>().add(
                                  AuthSignUpSubmitted(
                                    email: data["email"],
                                    password: data["password"],
                                  ),
                                );
                          }
                        },
                  child: state is AuthLoading
                      ? const CircularProgressIndicator()
                      : const Text("Sign Up"),
                );
                
              },
            ),
          ),
        ],
      ),
    );
  }
}
