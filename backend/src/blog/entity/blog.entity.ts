import { max } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    Blog_ID: number;

    @ManyToOne(()=>User, (user)=>user.blogs,{nullable:false, onDelete:"CASCADE"})
    // @JoinColumn()
    user:User

    @Column()
    Title: string;

    // @Column({type: "varchar",length:"MAX"})
    // Text: string;

    @CreateDateColumn()
    // @Column({ type: 'timestamptz', nullable: true })
    Create_Time: Date;

    @UpdateDateColumn({nullable:true})
    Update_Time: Date;
}