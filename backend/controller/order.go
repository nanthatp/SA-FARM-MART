package controller

import (
	"net/http"

	"github.com/JRKs1532/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /orders
func Order(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var order entity.Order
	var product entity.Product
	var cart entity.Cart

	if err := c.ShouldBindJSON(&order); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: ค้นหา product ด้วย id
	if tx := entity.DB().Where("id = ?", order.ProductID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}

	// 14: ค้นหา cart ด้วย id
<<<<<<< HEAD
	if tx := entity.DB().Where("id = ?", order.CartID).First(&order); tx.RowsAffected == 0 {
=======
	if tx := entity.DB().Where("id = ?", order.CartID).First(&cart); tx.RowsAffected == 0 {
>>>>>>> 317420c0662edba199180edb0b65f1d40052d430
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}

<<<<<<< HEAD
	// 15: สร้าง (product,quantity,cart)
=======
	// 15: สร้าง (d,m,MEDICINE_AMOUNT,TIME_STAMP)
>>>>>>> 317420c0662edba199180edb0b65f1d40052d430
	od := entity.Order{
		Product:          product, // โยงความสัมพันธ์กับ Entity product
		Product_quantity: order.Product_quantity,
<<<<<<< HEAD
		Cart:             cart, // โยงความสัมพันธ์กับ Cart
	}

	// 16: บันทึก order
=======
		Cart:             cart, // โยงความสัมพันธ์กับ E
	}

	// 16: บันทึก_Dispensation_Medicine
>>>>>>> 317420c0662edba199180edb0b65f1d40052d430
	if err := entity.DB().Create(&od).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": od}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}

func GetOrders(c *gin.Context) {
	var order entity.Cart
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order})
}

<<<<<<< HEAD
// GET /orders
func ListOrders(c *gin.Context) {
	var orders []entity.Cart
=======
// GET order
func ListOrder(c *gin.Context) {
	var orders []entity.Order

>>>>>>> 317420c0662edba199180edb0b65f1d40052d430
	if err := entity.DB().Preload("Product").Preload("Cart").Raw("SELECT * FROM orders").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
<<<<<<< HEAD
=======
}

// DELETE /carts/:id
func DeleteOrders(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM carts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /carts
func UpdateOrders(c *gin.Context) {
	var order entity.Cart
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", order.ID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	if err := entity.DB().Save(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
>>>>>>> 317420c0662edba199180edb0b65f1d40052d430
}
