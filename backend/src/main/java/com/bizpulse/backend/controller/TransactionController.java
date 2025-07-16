package com.bizpulse.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bizpulse.backend.dto.FileUploadResponse;
import com.bizpulse.backend.model.Transaction;
import com.bizpulse.backend.service.S3Service;
import com.bizpulse.backend.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @Autowired
    S3Service s3Service;

    @GetMapping("/")
    public ResponseEntity<List<Transaction>> index() {
        try {
            List<Transaction> transactions = transactionService.findAll();
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Transaction> store(@RequestBody Transaction transaction) {
        transaction.setUser_id(1);
        try {
            return new ResponseEntity<Transaction>(transactionService.create(transaction), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new FileUploadResponse(false, "File is empty", null));
            }
            if (!isValidFileType(file)) {
                return ResponseEntity.badRequest()
                        .body(new FileUploadResponse(false,
                                "Invalid file type. Only PNG, PDF, and JPG files are allowed", null));
            }
            if (file.getSize() > 5 * 1024 * 1024) { // 5MB
                return ResponseEntity.badRequest()
                        .body(new FileUploadResponse(false, "File size exceeds 5MB", null));
            }

            String fileUrl = s3Service.uploadFile(file);

            return ResponseEntity.ok(new FileUploadResponse(true, "File uploaded successfully", fileUrl));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new FileUploadResponse(false, "Failed to upload file: " + e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new FileUploadResponse(false, "Unexpected error occurred", null));
        }
    }

    private boolean isValidFileType(MultipartFile file) {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();

        if (contentType != null) {
            return contentType.equals("image/png") ||
                    contentType.equals("image/jpg") ||
                    contentType.equals("image/jpeg") ||
                    contentType.equals("application/pdf");
        }

        if (fileName != null) {
            String extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.') + 1);
            return extension.equals("png") ||
                    extension.equals("jpg") ||
                    extension.equals("jpeg") ||
                    extension.equals("pdf");
        }

        return false;
    }
}
