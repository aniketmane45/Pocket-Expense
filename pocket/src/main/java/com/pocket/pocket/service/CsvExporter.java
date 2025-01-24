package com.pocket.pocket.service;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import com.pocket.pocket.model.UserExpenseData;

public class CsvExporter {
  public static String generateCSV(List<UserExpenseData> expenses) {
    StringWriter writer = new StringWriter();
    PrintWriter csvWriter = new PrintWriter(writer);

    // Add header row
    csvWriter.println("Id,Amount,Category,Date,Description,Gender,Name,DOB,UserId");

    // Add data rows
    for (UserExpenseData expense : expenses) {
      csvWriter.println(String.join(",",
          String.valueOf(expense.getId()),
          String.valueOf(expense.getAmount()),
          expense.getCategory(),
          expense.getDate(),
          expense.getDescription(),
          expense.getGender(),
          expense.getName(),
          expense.getDob(),
          String.valueOf(expense.getUserId())));
    }
    csvWriter.flush();
    return writer.toString();
  }
}
