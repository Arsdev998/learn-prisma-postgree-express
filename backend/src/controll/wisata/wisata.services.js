const prisma = require('../../db/index.js');
const cloudinary = require('cloudinary').v2;

const getAllWisata = async () => {
  const wisata = await prisma.wisata.findMany({
    include: {
      images: true,
      comments: true,
      ratings: true,
      favorites: true
    }
  });
  return wisata;
};

const getWisataById = async (id) => {
  if (typeof id !== 'number') {
    throw new Error('Id is not a number');
  }
  const wisata = await prisma.wisata.findUnique({
    where: { id },
    include: {
      images: true,
      comments: true,
      ratings: true,
      favorites: true
    }
  });

  if (!wisata) {
    throw new Error('Wisata not found');
  }

  return wisata;
};

const createWisata = async (newWisataData) => {
  const wisata = await prisma.wisata.create({
    data: {
      name: newWisataData.name,
      description: newWisataData.description,
      maps: newWisataData.maps,
      provinsi: newWisataData.provinsi,
      kabupaten: newWisataData.kabupaten,
      kecematan: newWisataData.kecematan,
      coverimg: newWisataData.coverimg,
      images: {
        create: newWisataData.images
      }
    },
    include: {
      images: true
    }
  });
  return wisata;
};

const deleteWisata = async (id) => {
  const wisata = await getWisataById(id);

  // Menghapus gambar dari Cloudinary
  if (wisata.coverimg) {
    const coverImgPublicId = wisata.coverimg.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`wisata-images/${coverImgPublicId}`);
  }

  if (wisata.images && wisata.images.length > 0) {
    for (const image of wisata.images) {
      const imgPublicId = image.url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`wisata-images/${imgPublicId}`);
    }
  }

  // Menghapus records terkait di Prisma
  await prisma.comment.deleteMany({ where: { wisataId: id } });
  await prisma.rating.deleteMany({ where: { wisataId: id } });
  await prisma.favorite.deleteMany({ where: { wisataId: id } });
  await prisma.image.deleteMany({ where: { wisataId: id } });

  await prisma.wisata.delete({
    where: { id }
  });
};

const updateWisata = async (id, wisataData) => {
  const existingWisata = await getWisataById(id);

  // Hapus coverimg lama jika ada yang baru diunggah
  if (wisataData.coverimg && existingWisata.coverimg) {
    const coverImgPublicId = existingWisata.coverimg.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`wisata-images/${coverImgPublicId}`);
  }

  // Hapus gambar lama jika ada yang baru diunggah
  if (wisataData.images && existingWisata.images.length > 0) {
    for (const image of existingWisata.images) {
      const imgPublicId = image.url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`wisata-images/${imgPublicId}`);
    }
  }

  const wisata = await prisma.wisata.update({
    where: { id },
    data: {
      ...wisataData,
      images: wisataData.images ? {
        deleteMany: {}, // Menghapus semua gambar yang ada sebelumnya
        create: wisataData.images.map((url) => ({ url })),
      } : undefined,
    },
    include: {
      images: true,
    },
  });

  return wisata;
};


module.exports = {
  getAllWisata,
  getWisataById,
  createWisata,
  deleteWisata,
  updateWisata
};
