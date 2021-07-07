package app.core.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageStorageService {
	
	@Value("${file.upload-dir}")
	private String storageDir;
	private Path fileStoragePath;
	
	@PostConstruct
	public void init() {
		this.fileStoragePath = Paths.get(this.storageDir).toAbsolutePath();
		try {
			// create the directory
			Files.createDirectories(fileStoragePath);
		} catch (IOException e) {
			throw new RuntimeException("could not create directory", e);
		}
	}
	
	public String storeFile(MultipartFile file, String filePathName) {
		if (filePathName.contains("..")) {
			throw new RuntimeException("file name contains ilegal caharacters");
		}
		// copy the file to the destination directory (if already exists replace)
		try {
			Path targetLocation = this.fileStoragePath.resolve(filePathName);
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			String newPath = Paths.get(filePathName).toString();
			return newPath;
		} catch (IOException e) {
			throw new RuntimeException("storing file " + filePathName + " failed", e);
		}
	}
	
	public void deleteFile(String filePathName) {
		if (filePathName.contains("..")) {
			throw new RuntimeException("file name contains ilegal caharacters");
		}
		try {
			Path targetLocation = this.fileStoragePath.resolve(filePathName);
			Files.deleteIfExists(targetLocation);
		} catch (IOException e) {
			throw new RuntimeException("storing file " + filePathName + " failed", e);
		}
	}

}
