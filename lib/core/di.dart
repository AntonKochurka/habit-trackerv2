import 'package:get_it/get_it.dart';
import 'package:flutter/foundation.dart';
import 'package:habit_trackerv2/core/api/api_client.dart';
import 'package:habit_trackerv2/core/storage/storage_desktop.dart';
import 'package:habit_trackerv2/core/storage/storage_interface.dart';
import 'package:habit_trackerv2/core/storage/storage_mobile.dart';

final getIt = GetIt.instance;

void setupDI() {
  final storage = 
      [TargetPlatform.android, TargetPlatform.iOS].contains(defaultTargetPlatform)
          ? MobileSecureStorage()
          : DesktopStorage();

  getIt.registerLazySingleton<StorageInterface>(() => storage);
  getIt.registerLazySingleton<ApiClient>(() => ApiClient(getIt<StorageInterface>()));
}
