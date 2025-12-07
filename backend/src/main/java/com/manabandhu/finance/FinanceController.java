package com.manabandhu.finance;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/finance")
public class FinanceController {
    
    @GetMapping("/expenses")
    public List<Map<String, Object>> getExpenses(@RequestParam String userId) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "description", "Groceries", "amount", 50, "currency", "USD"));
    }
    
    @PostMapping("/expenses")
    public Map<String, Object> addExpense(@RequestBody Map<String, Object> expense) {
        expense.put("id", UUID.randomUUID().toString());
        return expense;
    }
    
    @GetMapping("/wallets")
    public List<Map<String, Object>> getWallets(@RequestParam String userId) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "name", "Shared Apartment", "balance", 500));
    }
    
    @PostMapping("/convert")
    public Map<String, Object> convertCurrency(@RequestParam String from, @RequestParam String to, @RequestParam double amount) {
        return Map.of("from", from, "to", to, "amount", amount, "converted", amount * 1.2);
    }
    
    @GetMapping("/reports")
    public Map<String, Object> getReports(@RequestParam String userId) {
        return Map.of("totalExpenses", 1500, "categories", Map.of("food", 500, "rent", 1000));
    }
}
