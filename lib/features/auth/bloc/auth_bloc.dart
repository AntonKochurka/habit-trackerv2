import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  AuthBloc() : super(AuthInitial()) {
    on<AuthLogInSubmitted>((event, emit) async {
      emit(AuthLoading());
      await Future.delayed(const Duration(seconds: 3));

      emit(AuthFailure("Unknown user"));
    });
    on<AuthSignUpSubmitted>((event, emit) async {
      emit(AuthLoading());
      await Future.delayed(const Duration(seconds: 3));

      emit(AuthFailure("Unknown user"));
    });
  }
}
