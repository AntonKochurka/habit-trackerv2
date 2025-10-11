import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'navigation_state.dart';

class NavigationCubit extends Cubit<NavigationState> {
  NavigationCubit() : super(NavigationSplashPage()) {
    _startApp();
  }
  
  void _startApp() async {
    await Future.delayed(const Duration(seconds: 3));
    final isAuthenticated = await checkAuthentication();

    if (isAuthenticated) {
      emit(NavigationCalendarPage());
    } else {
      emit(NavigationLogInPage());
    }
  }

  Future checkAuthentication() async {
    return false;
  }

  void navigateSplash() => emit(NavigationSplashPage());
  void navigateLogIn() => emit(NavigationLogInPage());
  void navigateSignUp() => emit(NavigationSignUpPage());
  void navigateCalendar() => emit(NavigationCalendarPage());
  void navigateDay() => emit(NavigationDayPage());
  void navigateHabit() => emit(NavigationHabitPage());
  void navigateCreateHabit() => emit(NavigationCreateHabitPage());
}
