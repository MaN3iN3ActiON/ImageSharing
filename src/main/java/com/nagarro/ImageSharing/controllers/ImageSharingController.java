package com.nagarro.ImageSharing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nagarro.ImageSharing.services.ImageSharingService;

@RestController
public class ImageSharingController {

	private ImageSharingService service;

	@Autowired
	public ImageSharingController(ImageSharingService service) {
		super();
		this.service = service;
	}

	@GetMapping(value = "/images/id/{id}")
	public ResponseEntity<byte[]> getImageById(@PathVariable String id) {
		byte[] media = service.getImageById(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setCacheControl(CacheControl.noCache().getHeaderValue());
		headers.setContentType(MediaType.IMAGE_PNG);
		ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(media, headers, HttpStatus.OK);
		return responseEntity;
	}

	@PostMapping("/images")
	public String addImage(@RequestParam("image") MultipartFile image, @RequestParam("expireAt") String expireAt) {
		return service.addImage(image, expireAt);
	}

}
