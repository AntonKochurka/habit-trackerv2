import 'package:bloc/bloc.dart';
import 'package:habit_trackerv2/core/api/api_client.dart';
import 'package:habit_trackerv2/core/api/api_exception.dart';
import 'package:meta/meta.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class Tokens {
  final String access;
  final String refresh;
  Tokens({required this.access, required this.refresh});
}

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final ApiClient apiClient;

  AuthBloc(this.apiClient) : super(AuthInitial()) {
    on<AuthLogInSubmitted>(_onLogInSubmitted);
    on<AuthSignUpSubmitted>(_onSignUpSubmitted);
  }

  Future<void> _onLogInSubmitted(
    AuthLogInSubmitted event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());
    try {
      final tokenResponse = await apiClient.post<Map<String, dynamic>>(
        "/auth/obtain",
        data: {
          "email": event.email,
          "password": event.password,
        },
      );

      final tokens = Tokens(
        access: tokenResponse.data?["access"] ?? '',
        refresh: tokenResponse.data?["refresh"] ?? '',
      );

      apiClient.setTokens(tokens.access, tokens.refresh);
      emit(AuthSuccess());
    } on ApiException catch (e) {
      emit(AuthFailure(e.message));
    } catch (e) {
      emit(AuthFailure("Unexpected error: $e"));
    }
  }

  Future<void> _onSignUpSubmitted(
    AuthSignUpSubmitted event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());
    try {
      await apiClient.post(
        "/users",
        data: {
          "email": event.email,
          "password": event.password,
        },
      );

      final tokenResponse = await apiClient.post<Map<String, dynamic>>(
        "/auth/obtain",
        data: {
          "email": event.email,
          "password": event.password,
        },
      );

      final tokens = Tokens(
        access: tokenResponse.data?["access"] ?? '',
        refresh: tokenResponse.data?["refresh"] ?? '',
      );

      if (tokens.access.isEmpty) {
        emit(AuthFailure("Invalid response from server"));
        return;
      }

      apiClient.setTokens(tokens.access, tokens.refresh);
      emit(AuthSuccess());
    } on ApiException catch (e) {
      emit(AuthFailure(e.message));
    } catch (e) {
      emit(AuthFailure("Unexpected error: $e"));
    }
  }
}
