import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

final lightTheme = ThemeData(
  brightness: Brightness.light,
  primaryColor: Color.fromRGBO(150, 167, 141, 1),
  scaffoldBackgroundColor: Color.fromRGBO(240, 240, 240, 1),
  cardColor: Colors.white,
  textTheme: GoogleFonts.poppinsTextTheme(
    ThemeData.light().textTheme,
  ),
  iconTheme: IconThemeData(color: Color.fromRGBO(150, 167, 141, 1)),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color.fromRGBO(150, 167, 141, 1),
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
  ),
  colorScheme: ColorScheme.light(
    primary: Color.fromRGBO(150, 167, 141, 1),
    secondary: Color.fromRGBO(182, 206, 180, 1),
    surface: Color.fromRGBO(217, 233, 207, 1),
    onPrimary: Colors.white,
    onSecondary: Colors.white,
  ),
);

final darkTheme = ThemeData(
  brightness: Brightness.dark,
  primaryColor: Color.fromRGBO(105, 117, 101, 1),
  scaffoldBackgroundColor: Color.fromRGBO(30, 32, 30, 1),
  cardColor: Color.fromRGBO(60, 61, 55, 1),
  textTheme: GoogleFonts.poppinsTextTheme(
    ThemeData.dark().textTheme,
  ),
  iconTheme: IconThemeData(color: Color.fromRGBO(236, 223, 204, 1)),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Color.fromRGBO(105, 117, 101, 1),
      foregroundColor: Color.fromRGBO(236, 223, 204, 1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    ),
  ),
  colorScheme: ColorScheme.dark(
    primary: Color.fromRGBO(105, 117, 101, 1),
    secondary: Color.fromRGBO(60, 61, 55, 1),
    surface: Color.fromRGBO(60, 61, 55, 1),
    onPrimary: Color.fromRGBO(236, 223, 204, 1),
    onSurface: Color.fromRGBO(236, 223, 204, 1),
  ),
);