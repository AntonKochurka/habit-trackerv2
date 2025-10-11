part of 'navigation_cubit.dart';

@immutable
sealed class NavigationState {}

final class NavigationSplashPage extends NavigationState {}

final class NavigationAuthPage extends NavigationState {}

final class NavigationCalendarPage extends NavigationState {}

final class NavigationDayPage extends NavigationState {}

final class NavigationHabitPage extends NavigationState {}

final class NavigationCreateHabitPage extends NavigationState {}