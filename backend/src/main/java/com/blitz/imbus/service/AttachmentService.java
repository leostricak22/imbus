package com.blitz.imbus.service;

import com.blitz.imbus.domain.exception.AppException;
import com.blitz.imbus.domain.exception.ErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;

@Service
@AllArgsConstructor
public class AttachmentService {
    public boolean isAttachmentImage(String base64string) {
        try {
            byte[] imageBytes = Base64.getDecoder().decode(base64string);

            ByteArrayInputStream bis = new ByteArrayInputStream(imageBytes);
            BufferedImage image = ImageIO.read(bis);

            return image != null;
        } catch (IllegalArgumentException | IOException e) {
            return false;
        }
    }

    public void validateAttachmentImage(String attachmentBase64) {
        if (!isAttachmentImage(attachmentBase64)) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }
    }
}
