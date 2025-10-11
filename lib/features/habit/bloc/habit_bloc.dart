import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'habit_event.dart';
part 'habit_state.dart';

class HabitBloc extends Bloc<HabitEvent, HabitState> {
  HabitBloc() : super(HabitInitial()) {
    on<HabitEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
