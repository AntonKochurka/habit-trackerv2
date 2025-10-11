import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';

part 'day_event.dart';
part 'day_state.dart';

class DayBloc extends Bloc<DayEvent, DayState> {
  DayBloc() : super(DayInitial()) {
    on<DayEvent>((event, emit) {
      // TODO: implement event handler
    });
  }
}
