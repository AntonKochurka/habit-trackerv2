import 'package:dio/dio.dart';
import 'package:habit_trackerv2/core/api/api_exception.dart';
import 'package:habit_trackerv2/core/config.dart';
import 'package:habit_trackerv2/core/storage/storage_interface.dart';

class ApiClient {
  final Dio dio;
  final StorageInterface storage;

  ApiClient(this.storage)
      : dio = Dio(BaseOptions(
          baseUrl: Config.apiBaseUrl,
          connectTimeout: const Duration(seconds: 10),
          receiveTimeout: const Duration(seconds: 10),
          headers: {'Content-Type': 'application/json'},
        )) {
    dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      requestHeader: false,
      responseHeader: false,
    ));
  }

  Future<void> _attachBearerToken() async {
    final token = await storage.read('access_token');
    if (token != null && token.isNotEmpty) {
      dio.options.headers['Authorization'] = 'Bearer $token';
    } else {
      dio.options.headers.remove('Authorization');
    }
  }

  Future<Response<T>> get<T>(String path, {Map<String, dynamic>? query}) async {
    await _attachBearerToken();
    try {
      return await dio.get<T>(path, queryParameters: query);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<Response<T>> post<T>(String path, {dynamic data}) async {
    await _attachBearerToken();
    try {
      return await dio.post<T>(path, data: data);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<Response<T>> put<T>(String path, {dynamic data}) async {
    await _attachBearerToken();
    try {
      return await dio.put<T>(path, data: data);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<Response<T>> delete<T>(String path) async {
    await _attachBearerToken();
    try {
      return await dio.delete<T>(path);
    } on DioException catch (e) {
      throw ApiException.fromDioError(e);
    }
  }

  Future<void> setTokens(String access, String refresh) async {
    storage.write("access", access);
    storage.write("refresh", refresh);
  }
}
