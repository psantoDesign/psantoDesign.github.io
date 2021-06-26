PaulSantoroWebsite.controller("experience-controller", 
	["$scope", "$window", 
		function ExperienceController($scope, $window) {

			$scope.windowWidth = 0;
			$scope.projectImageView = [];  // Images in the carousel
			$scope.experience = [];

			// Initializes the page.
			function initialize() {
				// Initialize the experience.
				$scope.experience = [
					{
						title: "3D Modeling",
						description: "Blender has been my go to program for creating 3D models for the past few years. Blender has extensive functions for modeling, sculpting, texture painting, texture baking, material creation, rigging and animating, and rendering. I've used Blender to create all sorts of assets including characters, props, and textures.",
						imagesInCarousel: [
							{
								source: "Experience/3DModelingImgs/3dmodeling_img1.png",
								altText: "3D Modeling Image 1",
								isVideo: false
							},
							{
								source: "Experience/3DModelingImgs/3dmodeling_img2.png",
								altText: "3D Modeling Image 2",
								isVideo: false
							},
							{
								source: "Experience/3DModelingImgs/3dmodeling_img3.png",
								altText: "3D Modeling Image 3",
								isVideo: false
							},
							{
								source: "Experience/3DModelingImgs/3dmodeling_img4.png",
								altText: "3D Modeling Image 4",
								isVideo: false
							},
							{
								source: "Experience/3DModelingImgs/3dmodeling_img5.png",
								altText: "3D Modeling Image 5",
								isVideo: false
							}
						]
					},
					{
						title: "Illustration",
						description: "I currently use Wacom drawing tablets to create illustrations in both Adobe Photoshop and Adobe Illustrator. I've created multiple illustrations including character designs, environment designs, wallpapers, references for 3D assets and more.",
						imagesInCarousel: [
							{
								source: "Experience/IllustrationImgs/illustration_img1.png",
								altText: "Illustration Image 1",
								isVideo: false
							},
							{
								source: "Experience/IllustrationImgs/illustration_img2.png",
								altText: "Illustration Image 2",
								isVideo: false
							},
							{
								source: "Experience/IllustrationImgs/illustration_img3.png",
								altText: "Illustration Image 3",
								isVideo: false
							},
							{
								source: "Experience/IllustrationImgs/illustration_img4.png",
								altText: "Illustration Image 4",
								isVideo: false
							},
							{
								source: "Experience/IllustrationImgs/illustration_img5.png",
								altText: "Illustration Image 5",
								isVideo: false
							}
						]
					},
					{
						title: "Material Creation",
						description: "The main two programs I use when creating materials for 3D assets are Adobe Photoshop and Substance Painter. I use 3D meshes I create in Blender to generate normal, ambient occlusion, and curvature maps to assist in making materials. I've created multiple textures using Photoshop and used those textures as resources when making materials in Substance Painter.",
						imagesInCarousel: [
							{
								source: "Experience/MaterialCreationImgs/materialcreation_img1.png",
								altText: "Material Creation Image 1",
								isVideo: false
							},
							{
								source: "Experience/MaterialCreationImgs/materialcreation_img2.png",
								altText: "Material Creation Image 2",
								isVideo: false
							},
							{
								source: "Experience/MaterialCreationImgs/materialcreation_img3.png",
								altText: "Material Creation Image 3",
								isVideo: false
							},
							{
								source: "Experience/MaterialCreationImgs/materialcreation_img4.png",
								altText: "Material Creation Image 4",
								isVideo: false
							},
							{
								source: "Experience/MaterialCreationImgs/materialcreation_img5.png",
								altText: "Material Creation Image 5",
								isVideo: false
							},
							{
								source: "Experience/MaterialCreationImgs/materialcreationimg6.png",
								altText: "Material Creation Image 6",
								isVideo: false
							}
						]
					},
				];

				// Initialize the thumbnail images from the carousel images (max 6)
				for (let i = 0; i < $scope.experience.length; i++) {
					$scope.experience[i].firstThreeImagesInCarousel = [];
					for (let j = 0; j < Math.min($scope.experience[i].imagesInCarousel.length, 6); j++) {
						$scope.experience[i].firstThreeImagesInCarousel.push($scope.experience[i].imagesInCarousel[j]);
					}
				}

				// Threshold for project column reorganization.
				$scope.oneColumnMaxWidth = 940;
				$scope.onWindowResize();
			}

			function isVideo(fileName) {
				if (fileName.endsWith(".mp4"))
					return true;
				else
					return false;
			}

			function onCarouselItemChanged(lastItemIndex) {
				let projectImage = $scope.projectImageView[lastItemIndex];
				// console.log("Active Image Index == ", lastItemIndex);

				if (projectImage.isVideo) {
					// Stop the video.
					if (!projectImage.element) {
						projectImage.element = $("#" + projectImage.id)[0];
					}

					projectImage.element.pause();
					projectImage.element.currentTime = 0;
				}
			}

			function setColumnView(targetColumns) {
				if (targetColumns === 1) {
					setOneColumnView();
				} else if (targetColumns === 2) {
					setTwoColumnView();
				}
			}

			// Sets the page view to show one column.  The project images are on the top and the description / images are on the bottom.
			function setOneColumnView() {
				console.log("Set one column view called");
				$scope.isTwoColumns = false;
			}

			// Sets the page view to show two columns, where the left column has the project thumbnail and the right column has the project info.
			function setTwoColumnView() {
				console.log("Set two column view called");
				$scope.isTwoColumns = true;
			}

			$scope.closeImageCarousel = function () {
				$scope.isImageCarouselOpen = false;
			};

			// Initialize the carousel.
			$scope.onClickExperienceImage = function (experienceItem, imageIndex) {
				console.log("Called 'onClickExperienceImage'");

				// Make it so that the images can be viewed.  Don't modify this part of the code.
				$scope.projectImageView = [];

				for (let i = 0; i < experienceItem.imagesInCarousel.length; i++) {
					$scope.projectImageView.push({
						alt: "Slide " + i,
						carouselIndicatorClass: i === imageIndex ? "active" : "",
						carouselInnerClass: i === imageIndex ? "carousel-item active" : "carousel-item",
						id: "carouselItem" + i,
						index: i,
						isVideo: isVideo(experienceItem.imagesInCarousel[i].source),
						src: experienceItem.imagesInCarousel[i].source
					});
				}

				$scope.isImageCarouselOpen = true;
			};

			// Redirect.
			$scope.onClickNavigationButton = function (href) {
				$window.location.href = href;
			};

			// On resizing the window, determines how page data will be displayed.
			$scope.onWindowResize = function () {
				let previousWidth = $scope.windowWidth;
				let newWidth = $window.innerWidth;
				$scope.windowWidth = newWidth;

				// One-column view
				if (newWidth <= $scope.oneColumnMaxWidth && (previousWidth === 0 || previousWidth > $scope.oneColumnMaxWidth)) {  // Shrinking the window or initialization
					setColumnView(1);
					return;
				}

				// Two-column view
				if ((newWidth > $scope.oneColumnMaxWidth && previousWidth <= $scope.oneColumnMaxWidth && previousWidth !== 0)  // Growing the window
					|| (newWidth > $scope.oneColumnMaxWidth && previousWidth === 0)) {  // Initialization
					setColumnView(2);
					return;
				}
			};

			// Calls the onWindowResize function and digests the $scope.  This is necessary
			// to ensure the page is updated correctly when the window is resized manually
			// by the user.
			$scope.onWindowResizeDigest = function () {
				$scope.onWindowResize();
				$scope.$digest();
			};

			// Unbind the window resize function from the $window.
			function cleanUp() {
				angular.element($window).off('resize', $scope.onWindowResizeDigest);
			}

			// Bind the window resize function to the $window.
			angular.element($window).on('resize', $scope.onWindowResizeDigest);

			// Clean up the page.
			$scope.$on('$destroy', cleanUp);

			// Handle changing the carousel images.
			$("#carouselProjectImages").bind("slide.bs.carousel", function (e) {
				//console.log("Slide Event Args == ", e);
				onCarouselItemChanged(e.from);
			});
	
			// Initialize the page.  This should only be done once all other functions have been declared.
			initialize();
	}]);