package com.nagarro.ImageSharing.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.nagarro.ImageSharing.models.ImageSharing;

@Repository
public interface ImageSharingRepository extends MongoRepository<ImageSharing, String> {

	public ImageSharing findFirstById(String id);

}
