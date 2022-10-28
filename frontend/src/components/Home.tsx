import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";

function Home(){
    return(
        <Box>
            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบหลัก : Farm Mart </h2>
                        </Grid>
                        <Grid marginBottom={2}>
                        ระบบ Farm mart เป็นระบบที่ผู้ใช้ระบบสามารถ sign in เข้าระบบเพื่อคิดเงินสินค้าที่ลูกค้าเลือกซื้อภายในร้าน Farm mart 
                        โดยที่พนักงานทุกคนที่ผ่านการลงทะเบียนสามารถ sign in เข้าใช้งานระบบผ่าน email ของพนักงานได้ 
                        เป็นระบบที่สามารถจัดการสินค้าและคลังสินค้าภายในร้าน รวมทั้งมีข้อมูลรายละเอียดของพนักงานและลูกค้าที่สมัครเป็นสมาชิก
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบลงทะเบียนพนักงาน </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        ระบบลงทะเบียนลูกค้าสมาชิก เป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นพนักงาน
                        สามารถบันทึกข้อมูลของลูกค้าสมาชิกได้ ในข้อมูลลูกค้าสมาชิกประกอบไปด้วย
                        ชื่อ นามสกุล เพศ วันเกิด  จังหวัด เบอร์โทรศัพท์ และชื่อ-นามสกุลพนักงานที่เป็นผู้บันทึก

                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบลงทะเบียนพนักงาน)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> ผู้ใช้ระบบ
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> บันทึกข้อมูลของพนักงาน
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันตรวจสอบข้อมูลของพนักงานภายในร้านได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบลงทะเบียนลูกค้าสมาชิก </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        ระบบลงทะเบียนลูกค้าสมาชิก เป็นระบบที่ให้ผู้ใช้ระบบซึ่งเป็นพนักงาน
                        สามารถบันทึกข้อมูลของลูกค้าสมาชิกได้ ในข้อมูลลูกค้าสมาชิกประกอบไปด้วย
                        ชื่อ นามสกุล เพศ วันเกิด  จังหวัด เบอร์โทรศัพท์ และชื่อ-นามสกุลพนักงานที่เป็นผู้บันทึก
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบลงทะเบียนลูกค้าสมาชิก)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พนักงาน
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลของสมาชิก
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ร้านค้าสามารถจัดเก็บข้อมูลของลูกค้าสมาชิกได้
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบบันทึกข้อมูลสินค้า </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        นอกจากนี้ยังมีระบบบันทึกข้อมูลสินค้า  โดยมีผู้ใช้เป็นพนักงานทำการเข้าสู่ระบบโดยที่จะสามารถดูข้อมูลของสินค้า
                        ที่บันทึกไว้แล้ว และยังสามารถบันทึกข้อมูลสินค้ารายละเอียดของสินค้าได้ เช่น ชื่อสินค้า ราคาของสินค้า ประเภทของสินค้า 
                        และชื่อ-นามสกุลพนักงานที่เป็นผู้บันทึก เพื่อที่เป็นข้อมูลสินค้าในการนำไปใช้ในร้านค้า Farm mart 
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบบันทึกข้อมูลสินค้า)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พนักงาน
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลรายละเอียดของสินค้า
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันทราบข้อมูลของสินค้า
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย : ระบบบันทึกจำนวนสินค้า </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        ระบบบันทึกจำนวนสินค้า เป็นระบบที่มีหน้าที่ในการบันทึกข้อมูลเกี่ยวกับจำนวนสินค้า
                        เมื่อมีการนำเข้าและส่งขายสินค้าได้แก่ ตัวสินค้า รหัสสินค้า ชั้นสินค้าและล็อตสินค้า
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบบันทึกจำนวนสินค้า)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พนักงาน
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลจำนวนสินค้า
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันทราบข้อมูลจำนวนของสินค้า
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย :  ระบบเพิ่มข้อมูลรายการสินค้าที่ต้องชำระ </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        โดยระบบเพิ่มข้อมูลรายการสินค้าที่ต้องชำระ 
                        จะบันทึกข้อมูลของสินค้าที่ลูกค้าเลือกซื้อลงในตะกร้าสินค้า และบันทึกรายการสินค้าที่ลูกค้าต้องชำระ 
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบเพิ่มข้อมูลรายการสินค้าที่ต้องชำระ)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พนักงาน
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลของรายการสินค้าที่ต้องชำระ
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ฉันสามารถตรวจสอบได้ว่ารายการสินค้าที่ต้องชำระถูกต้องหรือไม่
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 20}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบย่อย :  ระบบชำระเงิน </h2>
                        </Grid>
                        <Grid>
                            <h4> Requirement </h4>
                        </Grid>
                        <Grid marginBottom={2}>
                        ระบบชำระเงิน เป็นระบบที่บันทึกข้อมูลการจ่ายเงินและช่องทางการจ่ายเงินของลูกค้า 
                        โดยพนักงานจะเป็นผู้ตรวจสอบแล้วป้อนจำนวนเงินยอดรวมสุทธิและจำนวนเงินที่รับ เข้าระบบ
                        </Grid>
                        <Grid marginBottom={2}>
                            <Grid>
                                <h4>User Story (ระบบชำระเงิน)</h4>
                            </Grid>
                            <Grid>
                                <b>ในบทบาทของ</b> พนักงาน
                            </Grid>
                            <Grid>
                                <b>ฉันต้องการ</b> ให้ระบบบันทึกข้อมูลการชำระเงิน
                            </Grid>
                            <Grid>
                                <b>เพื่อ</b> ให้ระบบบันทึกข้อมูลการชำระเงิน
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Home;