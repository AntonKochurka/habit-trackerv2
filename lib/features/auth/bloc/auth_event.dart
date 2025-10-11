part of 'auth_bloc.dart';

@immutable
sealed class AuthEvent {}

class AuthLogInSubmitted extends AuthEvent {
  final String email;
  final String password;

  AuthLogInSubmitted({required this.email, required this.password});
}

class AuthSignUpSubmitted extends AuthEvent {
  final String email;
  final String password;

  AuthSignUpSubmitted({required this.email, required this.password});
}