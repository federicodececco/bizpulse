package com.bizpulse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Data
public class FileUploadResponse {
    private boolean success;
    private String message;
    private String fileUrl;

}
