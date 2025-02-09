package controller

import (
	"net/http"

	"github.com/JRKs1532/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /orders
func Order(c *gin.Context) {
	var order entity.Order
	var product entity.Product
	var cart entity.Cart

	//ตรวจสอบ DB ว่ามีรูปแบบตามที่กำหนดมั๊ย
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: ค้นหา product ด้วย id
	if tx := entity.DB().Where("id = ?", order.ProductID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "product not found"})
		return
	}

	// 14: ค้นหา cart ด้วย id
	if tx := entity.DB().Where("id = ?", order.CartID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}

	// 15: สร้าง (product,quantity,cart)
	od := entity.Order{
		Product:          product, // โยงความสัมพันธ์กับ Entity product
		Product_quantity: order.Product_quantity,
		Cart:             cart, // โยงความสัมพันธ์กับ Cart
	}

	// 16: บันทึก order
	if err := entity.DB().Create(&od).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": od}) //ส่งข้อมูลกลับไป
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

// GET /orders
func ListOrders(c *gin.Context) {
	var orders []entity.Cart
	if err := entity.DB().Preload("Product").Preload("Cart").Raw("SELECT * FROM orders").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}
