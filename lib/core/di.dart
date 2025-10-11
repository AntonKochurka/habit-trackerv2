import 'package:get_it/get_it.dart';
import 'package:habit_trackerv2/core/api/api_client.dart';

final getIt = GetIt.instance;

void setupDI() {
  getIt.registerLazySingleton(() => ApiClient());
}