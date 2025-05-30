package com.microservice.ePharmaMS.payment_service.controller;

import com.microservice.ePharmaMS.payment_service.DTO.VnpayRequest;
import com.microservice.ePharmaMS.payment_service.service.VnpayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import lombok.AllArgsConstructor;

import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
@AllArgsConstructor
public class VnpayController {

    private final VnpayService vnpayService;

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody VnpayRequest paymentRequest) {
        try {
            String paymentUrl = vnpayService.createPayment(paymentRequest);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi tạo thanh toán!");
        }
    }

    @GetMapping("/return")
    public ResponseEntity<String> returnPayment(@RequestParam Map<String, String> allParams) {
        return vnpayService.validateVnpayResponse(allParams);
    }
}
