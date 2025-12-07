package com.manabandhu.marketplace;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/marketplace")
public class MarketplaceController {
    
    @GetMapping
    public List<Map<String, Object>> getItems(@RequestParam(required = false) String category) {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "title", "Sample Item", "price", 100));
    }
    
    @PostMapping
    public Map<String, Object> createItem(@RequestBody Map<String, Object> item) {
        item.put("id", UUID.randomUUID().toString());
        return item;
    }
    
    @GetMapping("/auctions")
    public List<Map<String, Object>> getAuctions() {
        return List.of(Map.of("id", UUID.randomUUID().toString(), "currentBid", 50));
    }
    
    @PostMapping("/auctions/{id}/bid")
    public Map<String, Object> placeBid(@PathVariable String id, @RequestBody Map<String, Object> bid) {
        return Map.of("success", true, "newBid", bid.get("amount"));
    }
}
