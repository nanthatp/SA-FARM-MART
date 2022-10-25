package controller

import (
	"net/http"

	"github.com/JRKs1532/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

/* Dispensation Medicine */
// POST /orders
func Order(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var order entity.Order
	var product entity.Product
	var cart entity.Cart

	if err := c.ShouldBindJSON(&order); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // เช็คว่าหากไม่มีการป้อนจำนวนยามาจะแจ้ง error ออกไป
	// if order.Product_quantity == 0 { // เนื่องจาก Number() ใน React หากเจอ null / undefined จะ return 0
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "medicine amount invalid"})
	// 	return
	// }

	// 13: ค้นหา product ด้วย id
	if tx := entity.DB().Where("id = ?", order.ProductID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}

	// 14: ค้นหา cart ด้วย id
	if tx := entity.DB().Where("id = ?", order.CartID).First(&cart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}

	// 15: สร้าง (d,m,MEDICINE_AMOUNT,TIME_STAMP)
	od := entity.Order{
		Product:          product, // โยงความสัมพันธ์กับ Entity Resolution
		Product_quantity: order.Product_quantity,
		Cart:             cart, // โยงความสัมพันธ์กับ E
	}

	// 16: บันทึก_Dispensation_Medicine
	if err := entity.DB().Create(&od).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": od}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}

// GET /dispensation_medicines
func ListOrder(c *gin.Context) {
	var orders []entity.Order

	/*** ตอนแสดงผลตารางต้องมี prepload ***/
	if err := entity.DB().Preload("Product").Raw("SELECT * FROM orders").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}
