import 'package:dio/dio.dart';
 
class ApiException implements Exception {
  final String message;
  final int? statusCode;

  ApiException(this.message, {this.statusCode});

  factory ApiException.fromDioError(DioException error) {
    if (error.type == DioExceptionType.connectionTimeout ||
        error.type == DioExceptionType.receiveTimeout) {
      return ApiException('Connection timed out');
    }
    if (error.type == DioExceptionType.badResponse) {
      final status = error.response?.statusCode;
      final msg = error.response?.data?['message'] ?? 'Unexpected server error';
      return ApiException(msg, statusCode: status);
    }
    return ApiException(error.message ?? 'Unknown network error');
  }

  @override
  String toString() => 'ApiException($statusCode): $message';
}
