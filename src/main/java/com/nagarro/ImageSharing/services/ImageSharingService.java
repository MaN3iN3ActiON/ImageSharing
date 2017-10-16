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
		long millisecs = (expireAtMilliSecs(expireAt));
		imageSharing.setId(UUID.randomUUID().toString());
		imageSharing.setDate(new Date(System.currentTimeMillis() + millisecs));

		return repository.save(imageSharing).getId();
	}

	public long expireAtMilliSecs(String expireAt) {
		long ans=0;
		switch (expireAt) {
			case "1" : ans = 300000;break;
			case "2" : ans= 600000;break;
			case "3" : ans= 1800000;break;
			case "4" : ans= 3600000;break;
			case "5" : ans= 10800000;break;
		}
		return ans;
	}

}
