package com.nagarro.ImageSharing.services;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nagarro.ImageSharing.models.ImageSharing;
import com.nagarro.ImageSharing.repositories.ImageSharingRepository;

@Service
public class ImageSharingService {

	private ImageSharingRepository repository;

	@Autowired
	public ImageSharingService(ImageSharingRepository repository) {
		super();
		this.repository = repository;
	}

	public byte[] getImageById(String id) {
		return repository.findFirstById(id).getImage().getData();
	}

	public String addImage(MultipartFile image, String expireAt) {
		ImageSharing imageSharing = new ImageSharing();

		try {
			imageSharing.setImage(new Binary(image.getBytes()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		long millisecs = (Long.parseLong(expireAt)) * 100;
		imageSharing.setId(UUID.randomUUID().toString());
		imageSharing.setDate(new Date(System.currentTimeMillis() + millisecs));

		return repository.save(imageSharing).getId();
	}

}
